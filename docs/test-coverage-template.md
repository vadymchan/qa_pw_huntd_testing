# Test Coverage - Huntd

<!--
Legend (як це лягає в структуру тестів):
  ##   = parentSuite  (велика функціональна зона)
  ###  = suite        (група сценаріїв усередині зони)
  рядки таблиці = майбутні тести (subSuite / окремі test)

Колонки:
  Scenario  - одне речення, ОДНА перевірка
  Type      - positive / negative
  Severity  - blocker / critical / normal / minor / trivial  (як в Allure)

Приклад нижче - ЗАМІНИ на свої зони/сценарії після аналізу huntd.tech.
-->

## Auth                                    <!-- parentSuite -->

### Login                                  <!-- suite -->
| #   | Scenario                          | Type     | Severity |
| --- | --------------------------------- | -------- | -------- |
| 1   | Login with valid credentials      | positive | blocker  |
| 2   | Login with wrong password         | negative | critical |
| 3   | Login with empty email field      | negative | normal   |

### Logout                                 <!-- suite -->
| #   | Scenario                          | Type     | Severity |
| --- | --------------------------------- | -------- | -------- |
| 1   | Logout from profile menu          | positive | normal   |

<!-- ── твої зони далі ────────────────────────────────────── -->

## <ParentSuite name>

### <Suite name>
| #   | Scenario | Type | Severity |
| --- | -------- | ---- | -------- |
| 1   |          |      |          |
