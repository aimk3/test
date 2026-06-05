# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Python Environments

This machine has two Python 3.12 installations:

- **System Python**: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3` — used by Jupyter notebooks in this repo
- **Miniconda**: `/opt/miniconda3/bin/python` — separate environment

When installing packages for notebooks, use the system Python explicitly:
```bash
/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -m pip install <package>
```

## Running Code

```bash
python3 test.py
```
