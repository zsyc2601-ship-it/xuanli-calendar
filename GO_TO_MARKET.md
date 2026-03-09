# XuanLi Go-To-Market Plan

## Positioning

- Core value: offline-first Chinese calendar and metaphysics utility
- Trust message: no login, no cloud sync, no birthday/query upload by default
- Conversion message: community edition for transparency, paid edition for richer content and workflow efficiency

## Overseas

### Channels

- GitHub: public community repository
- GitHub Releases: APK downloads
- X: demos, changelog, threads, launch posts
- Crypto payments: TRON / Binance address

### Product split

- Community:
  - open source
  - basic calendar, solar terms, ganzhi, base hexagram display
  - no bulk export, no advanced content packs
- Pro:
  - closed-source APK or closed data pack
  - full commentary content
  - export images / PDF
  - favorites, comparison views, advanced filters
  - priority updates

### Revenue flow

1. User discovers the project on GitHub or X.
2. User tries the community edition or trial APK.
3. User pays with TRON / Binance.
4. User sends TXID or order proof.
5. Manual fulfillment: send Pro APK or activation code.

### Copy angle

- Privacy-first
- Offline-first
- Scholar-style Chinese calendar reference
- Paid edition saves time and adds curated content

## China

### Channels

- Douyin: short demos, knowledge clips, feature comparisons
- WeChat: private traffic conversion
- Alipay / WeChat Pay: collection
- Closed-source APK delivery

### Product split

- Public content:
  - feature demos
  - use cases
  - knowledge snippets around solar terms, lunar dates, reign eras, hexagrams
- Paid product:
  - closed-source APK
  - full data pack
  - export / sharing tools
  - premium research tools

### Revenue flow

1. User sees demo on Douyin.
2. User moves to WeChat private chat.
3. User pays with WeChat or Alipay.
4. Manual fulfillment: share download link or APK package.

### Copy angle

- Local-only calculations
- Fast lookup for complex date systems
- Premium edition includes richer content and cleaner workflow

## Privacy Rules

- Keep all core calculations local where possible.
- Do not upload birthdays, query history, or user notes by default.
- If any remote text source is used, disclose it clearly in README and PRIVACY.md.
- Never publish keystore files or payment account secrets in source control.

## Release Hygiene

- Public repo must not contain:
  - keystore files
  - keystore passwords
  - APK signing intermediates
  - build artifacts
- Publish APKs via Releases, not by committing them into the repo.
- Maintain a separate paid build pipeline and signing key from the public repo if possible.

## Recommended Immediate Actions

1. Clean the repository before any public upload.
2. Rotate signing keys for public distribution.
3. Add LICENSE, PRIVACY.md, SECURITY.md, and a release README.
4. Define Community vs Pro feature boundaries before launch.
5. Launch overseas first through GitHub + X if you want faster validation.
