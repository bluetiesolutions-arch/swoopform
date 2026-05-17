import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Read service account
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync('./serviceAccount.json', 'utf8'));
} catch(e) {
  console.error('ERROR: serviceAccount.json not found!');
  console.log('Download it from Firebase Console → Project Settings → Service Accounts → Generate new private key');
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const auth = getAuth();
const db = getFirestore();

async function syncAllUsers() {
  console.log('Starting user sync...');
  let pageToken;
  let totalSynced = 0;

  do {
    const result = await auth.listUsers(1000, pageToken);
    
    for (const user of result.users) {
      try {
        const userRef = db.collection('users').doc(user.uid);
        const snap = await userRef.get();
        
        if (!snap.exists) {
          // Create new user record
          await userRef.set({
            uid: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            plan: 'free',
            verified: false,
            provider: user.providerData?.[0]?.providerId || 'email',
            createdAt: new Date(user.metadata.creationTime),
            lastLoginAt: new Date(user.metadata.lastSignInTime),
            updatedAt: new Date(),
            features: {},
            access: {},
            isAdmin: false,
          });
          console.log(`✅ Created: ${user.email}`);
          totalSynced++;
        } else {
          // Update existing - fill in missing fields
          const data = snap.data();
          const updates = {};
          if (!data.email && user.email) updates.email = user.email;
          if (!data.name && user.displayName) updates.name = user.displayName;
          if (!data.provider) updates.provider = user.providerData?.[0]?.providerId || 'email';
          if (!data.plan) updates.plan = 'free';
          if (!data.features) updates.features = {};
          if (!data.access) updates.access = {};
          if (!data.createdAt) updates.createdAt = new Date(user.metadata.creationTime);
          if (!data.lastLoginAt) updates.lastLoginAt = new Date(user.metadata.lastSignInTime);
          
          if (Object.keys(updates).length > 0) {
            await userRef.update(updates);
            console.log(`🔄 Updated: ${user.email}`);
          } else {
            console.log(`⏭ Skipped (already complete): ${user.email}`);
          }
        }
      } catch(e) {
        console.error(`❌ Error for ${user.email}: ${e.message}`);
      }
    }
    
    pageToken = result.pageToken;
    console.log(`Processed ${result.users.length} users...`);
    
  } while (pageToken);

  console.log(`\n🎉 Done! Synced ${totalSynced} new users to Firestore.`);
}

syncAllUsers().catch(console.error);
