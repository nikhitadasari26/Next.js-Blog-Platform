const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), 'posts');

for (let i = 6; i <= 20; i++) {
    const content = `---
title: 'Dummy Post ${i}'
date: '2023-01-${String(i).padStart(2, '0')}'
excerpt: 'This is dummy post number ${i} to test pagination.'
---

# Dummy Post ${i}

Pretend this is interesting content.
`;
    fs.writeFileSync(path.join(postsDir, `dummy-post-${i}.mdx`), content);
}
console.log('Created dummy posts');
