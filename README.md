# Сайт-аналог "Авито"

## Установка

### Бекенд

Для запуска бекенда на компьютере должен быть установлен docker и docker-compose ([https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)):

- Windows — Docker Desktop for Windows.
- MacOS — Docker Desktop for Mac.
- Linux — в зависимости от версии: CentOS, Debian, Fedora, Raspbian, Ubuntu.

Запустите Docker Desktop.

Склонируйте репозиторий. Из корневой папки проекта, где находится скрипт `docker-compose.yaml`, запустите скрипт:

```sh
cd skyvito
docker-compose up -d
```

Бэкенд и документация в Swagger GUI будут доступны по адресу:
[http:///localhost:8090/](http:///localhost:8090/)

Остановить работу бэкенда можно командой:

```sh
docker-compose down
```

### Фронтенд

Установите зависимости:

```sh
pnpm install
```

Для запуска в development режиме выполните команду

```sh
pnpm dev
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

При необходимости production сборки выполните команду

```sh
pnpm build
```

## Описание проекта:

Сайт-аналог "Авито". Макет доступен [здесь](https://www.figma.com/file/ISqzPS7Sym7V004jFo5buE/%D0%A1%D0%B0%D0%B9%D1%82-%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3-%D0%90%D0%B2%D0%B8%D1%82%D0%BE?node-id=0%3A1&t=TkHwMTtpkVn5B1xD-0)

### Технический стек приложения

- [x] React
- [x] Redux + Redux Toolkit + RTK Query
- [x] React Router DOM, реализация routing
- [x] Vite
- [x] js-cookie, react-responsive, react-hook-form
