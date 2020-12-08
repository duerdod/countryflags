# Countryflags api

The same structure as countryflags.io. Flags generated using [this](https://github.com/gosquared/flags).

## Run with docker

### Using docker manually

```
docker build -t countryflags . && docker run -it --init -p 8000:8000 countryflags
```

### With compose

```
docker-compose up
```
