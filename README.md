# Reportarch

Reportarch is a simple archive service for automation test reports. It accepts an HTML report file and stores it so that past test runs can be reviewed later.

## How it works

Send a POST request with the report file as the request body, using the `text/html` content type:

```bash
curl -X POST -H "Content-Type: text/html" --data-binary "@path/to/file" URL
```

Replace `URL` with the address of your running Reportarch instance and `path/to/file` with the path to the HTML report you want to archive.

## Use case

This is intended to be used alongside automated test suites (for example, Playwright or Cypress HTML reports) so that historical reports can be uploaded and kept in one place instead of being lost after each test run.
