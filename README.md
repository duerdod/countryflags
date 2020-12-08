# Countryflags api

## Format

The same structure as countryflags.io. Flags generated using [this](https://github.com/gosquared/flags).

### Example

```html
<img src="http://localhost:8000/:country_code/:style/:size.png" />
```

```html
<img src="http://localhost:8000/se/flat/64.png" />
```

![example](./flags/se/flat/64.png?raw=true)

## Run with docker

### Using docker manually

```
docker build -t countryflags . && docker run -it --init -p 8000:8000 countryflags
```

### With compose

```
docker-compose up
```
