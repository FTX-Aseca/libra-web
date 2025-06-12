module.exports = {
  branches: [
    "main",
    { name: "dev", prerelease: "dev", channel: "dev" }, // Creates pre-releases like v1.0.0-dev.1 from the dev branch
  ],
  plugins: [
    "@semantic-release/commit-analyzer", // Analyzes commit messages to determine release type
    "@semantic-release/release-notes-generator", // Generates release notes from commits
    [
      "@semantic-release/changelog", // Updates CHANGELOG.md
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    // Bump version in package.json
    "@semantic-release/npm",
    [
      "@semantic-release/git", // Commits updated files like CHANGELOG.md and package.json
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    [
      "@semantic-release/github", // Creates GitHub releases and uploads assets
      {
        // You can specify assets to upload here if you have build artifacts
        // assets: [
        //   { path: 'build/libs/*.jar', label: 'MyProject JAR' }
        // ]
      },
    ],
  ],
};
