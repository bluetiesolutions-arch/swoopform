content = open('jobapp/create/index.html', 'r').read()

# Find where the last script starts
idx = content.rfind('<script')
if idx == -1:
    print("ERROR: No script tag found")
    exit()

print(f"Found last script tag at line approx char {idx}")
print("First 100 chars of that section:")
print(content[idx:idx+100])
print("Total file length:", len(content))