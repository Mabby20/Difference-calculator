# Проект "Вычислитель отличий"
______
[![Actions Status](https://github.com/Mabby20/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Mabby20/frontend-project-46/actions)
[![compare-check](https://github.com/Mabby20/frontend-project-46/actions/workflows/compare-check.yml/badge.svg)](https://github.com/Mabby20/frontend-project-46/actions/workflows/compare-check.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/d2714b84cec473799f64/maintainability)](https://codeclimate.com/github/Mabby20/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d2714b84cec473799f64/test_coverage)](https://codeclimate.com/github/Mabby20/frontend-project-46/test_coverage)
## Описание проекта:
_**Вычислитель отличий**_ - это СLI утилита для вычисления отличий между двумя структурами данных.  
К примеру, имеется два файла в формате json. Первый файл - представляет состояние до изменения, второй после. Результатом работы утилиты является разница между двумя состояниями.
  
**_Возможности утилиты_**:  
- Поддержка разных входных форматов: yaml, json  
- Генерация отчета в виде plain text, stylish и json
_____
## Минимальные требования
- ОС - *nix подобные системы или настроенный Windows  
- Используемая версия Node при написании проекта v19.1.0.
- Минимальная версия Node >= 16.x
_____
## Инструкция по установке и запуску:
- Клонируем репозиторий с проектом, с помощью команды: git clone <ssh/url>.  
- Переходим в директорию с проектом, с помощью комадны: cd <нужная директория>.
- Устанавливаем зависимости проекта, с помощью команды: make install.
- Устанавливаем пакет с утилитой локально, с помощью команды: npm link.
- После установки с помощью команды **gendiff** и флага **-h** можно узнать как использовать утилиту.
_____
## Example of work CLI utility gendiff!
[![asciicast](https://asciinema.org/a/B9CemQu41tmNWj9JFbPZaG5pG.svg)](https://asciinema.org/a/B9CemQu41tmNWj9JFbPZaG5pG)
