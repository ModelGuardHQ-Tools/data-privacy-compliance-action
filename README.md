# Data Privacy Compliance Checker

> 🛡️ Fail CI/CD on committed secrets (API keys, `.env`) or basic PII (emails, phone numbers).

![Marketplace](https://img.shields.io/badge/Marketplace-v1.0.0-blue)
![Tests](https://github.com/ModelGuardHQ-Tools/data-privacy-compliance-action/workflows/Test%20Data%20Privacy%20Compliance/badge.svg)

## Quickstart

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  privacy-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Data Privacy Compliance Checker
        uses: ModelGuardHQ-Tools/data-privacy-compliance-action@v1.0.0

