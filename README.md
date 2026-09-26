# Reportarch (original prototype)

This is the original, simple prototype of Reportarch — a service for archiving automation test reports. It accepts an HTML report file and stores it so that past test runs can be reviewed later.

> **Note:** This prototype has been superseded by a full rewrite, split into [reportarch-frontend](https://github.com/siam1113/reportarch-frontend) and [reportarch-backend](https://github.com/siam1113/reportarch-backend), which support organizations, projects, test suites, and a proper web interface. This repository is kept for reference.

## How this prototype works

Send a POST request with the report file as the request body, using the `text/html` content type:

```bash
curl -X POST -H "Content-Type: text/html" --data-binary "@path/to/file" URL
```

Replace `URL` with the address of your running Reportarch instance and `path/to/file` with the path to the HTML report you want to archive.
