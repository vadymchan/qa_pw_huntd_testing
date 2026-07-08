# Test Coverage - Huntd

## Auth

### Register

#### Candidate

| #   | Scenario                                                            | Type     | Severity |
| --- | ------------------------------------------------------------------- | -------- | -------- |
| 1   | User should register with valid required-only fields                | positive | blocker  |
| 2   | User should register with all valid fields                          | positive | critical |
| 3   | User should see validation error when password is empty             | negative | normal   |
| 4   | User should see validation error when repeat password is empty      | negative | normal   |
| 5   | User should see validation error when repeat password is mismatched | negative | normal   |
| 6   | User should see validation error when email is empty                | negative | normal   |
| 7   | User should see validation error when email is invalid              | negative | normal   |
| 8   | User should see validation error when email is already taken        | negative | normal   |

#### Recruiter

| #   | Scenario                                                  | Type     | Severity |
| --- | --------------------------------------------------------- | -------- | -------- |
| 1   | User should register with valid required-only fields      | positive | blocker  |
| 2   | User should register with all valid fields                | positive | critical |
| 3   | User should see validation error when role is empty       | negative | normal   |
| 4   | User should see validation error when company is empty    | negative | normal   |
| 5   | User should see validation error when first name is empty | negative | normal   |
| 6   | User should see validation error when last name is empty  | negative | normal   |

### Login

| #   | Scenario                                                      | Type     | Severity |
| --- | ------------------------------------------------------------- | -------- | -------- |
| 1   | User should login with valid credentials                      | positive | blocker  |
| 2   | User should see validation error when email field is empty    | negative | critical |
| 3   | User should see validation error when password field is empty | negative | critical |
| 4   | User should see validation error when email is incorrect      | negative | critical |
| 5   | User should see validation error when password is incorrect   | negative | critical |

### Logout

| #   | Scenario                        | Type     | Severity |
| --- | ------------------------------- | -------- | -------- |
| 1   | User should logout successfully | positive | normal   |

## Account

### Recruiter

#### Edit Profile

| #   | Scenario                                                  | Type     | Severity |
| --- | --------------------------------------------------------- | -------- | -------- |
| 1   | User should update role                                   | positive | normal   |
| 2   | User should see validation error when role is empty       | negative | minor    |
| 3   | User should update company                                | positive | normal   |
| 4   | User should see validation error when company is empty    | negative | minor    |
| 5   | User should update first name                             | positive | normal   |
| 6   | User should see validation error when first name is empty | negative | minor    |
| 7   | User should update last name                              | positive | normal   |
| 8   | User should see validation error when last name is empty  | negative | minor    |
| 9   | User should update Linkedin                               | positive | normal   |

#### Account Settings

| #   | Scenario                                                            | Type     | Severity |
| --- | ------------------------------------------------------------------- | -------- | -------- |
| 1   | User should change password successfully                            | positive | normal   |
| 2   | User should see validation error when current password is empty     | negative | critical |
| 3   | User should see validation error when current password is incorrect | negative | critical |
| 4   | User should see validation error when new password is empty         | negative | normal   |
| 5   | User should see validation error when repeat password is empty      | negative | minor    |
| 6   | User should see validation error when repeat password is mismatched | negative | minor    |

### Candidate

#### Edit Profile

##### Role

| #   | Scenario                                                                           | Type     | Severity |
| --- | ---------------------------------------------------------------------------------- | -------- | -------- |
| 1   | User should update desired position                                                | positive | normal   |
| 2   | User should see validation error when desired position is empty                    | negative | minor    |
| 3   | User should update desired roles                                                   | positive | normal   |
| 4   | User should see validation error when desired roles is empty                       | negative | minor    |
| 5   | User should update core technical skills                                           | positive | normal   |
| 6   | User should see validation error when core technical skills are fewer than minimum | negative | minor    |

##### Expectations

| #   | Scenario                                                                   | Type     | Severity |
| --- | -------------------------------------------------------------------------- | -------- | -------- |
| 1   | User should update desired annual base salary                              | positive | normal   |
| 2   | User should see validation error when desired annual base salary is empty  | negative | minor    |
| 3   | User should update desired monthly base salary                             | positive | normal   |
| 4   | User should see validation error when desired monthly base salary is empty | negative | minor    |
| 5   | User should update job experience                                          | positive | normal   |
| 6   | User should see validation error when job experience is not selected       | negative | minor    |
| 7   | User should update English level                                           | positive | normal   |
| 8   | User should see validation error when English level is not selected        | negative | minor    |
| 9   | User should update location                                                | positive | normal   |
| 10  | User should see validation error when location is empty                    | negative | minor    |
| 11  | User should update employment options                                      | positive | normal   |
| 12  | User should see validation error when employment options are unchecked     | negative | minor    |

##### Experience

| #   | Scenario                                                                                    | Type     | Severity |
| --- | ------------------------------------------------------------------------------------------- | -------- | -------- |
| 1   | User should add job experience                                                              | positive | normal   |
| 2   | User should update job experience                                                           | positive | normal   |
| 3   | User should see validation error when job experience role is empty                          | negative | minor    |
| 4   | User should see validation error when job experience company name is empty                  | negative | minor    |
| 5   | User should see validation error when job experience start date month is empty              | negative | minor    |
| 6   | User should see validation error when job experience start date year is empty               | negative | minor    |
| 7   | User should see validation error when job experience start date year are fewer than minimum | negative | minor    |
| 8   | User should see validation error when job experience start date year has incorrect format   | negative | minor    |
| 9   | User should see validation error when job experience end date month is empty                | negative | minor    |
| 10  | User should see validation error when job experience end date year is empty                 | negative | minor    |
| 11  | User should see validation error when job experience end date year are fewer than minimum   | negative | minor    |
| 12  | User should see validation error when job experience end date year has incorrect format     | negative | minor    |
| 13  | User should see validation error when job experience start date is after end date           | negative | minor    |
| 14  | User should delete job experience                                                           | positive | normal   |

##### Bio

| #   | Scenario                                                    | Type     | Severity |
| --- | ----------------------------------------------------------- | -------- | -------- |
| 1   | User should update achivements                              | positive | normal   |
| 2   | User should see validation error when achivements are empty | negative | minor    |
| 3   | User should update expectations from work                   | positive | normal   |

##### Contacts

| #   | Scenario                                                  | Type     | Severity |
| --- | --------------------------------------------------------- | -------- | -------- |
| 1   | User should update first name                             | positive | normal   |
| 2   | User should see validation error when first name is empty | negative | minor    |
| 3   | User should update last name                              | positive | normal   |
| 4   | User should see validation error when last name is empty  | negative | minor    |
| 5   | User should update Linkedin                               | positive | normal   |
| 6   | User should update Behance                                | positive | normal   |
| 7   | User should update GitHub                                 | positive | normal   |

#### Account Settings

| #   | Scenario                                                            | Type     | Severity |
| --- | ------------------------------------------------------------------- | -------- | -------- |
| 1   | User should change password successfully                            | positive | normal   |
| 2   | User should see validation error when current password is empty     | negative | critical |
| 3   | User should see validation error when current password is incorrect | negative | critical |
| 4   | User should see validation error when new password is empty         | negative | normal   |
| 5   | User should see validation error when repeat password is empty      | negative | minor    |
| 6   | User should see validation error when repeat password is mismatched | negative | minor    |

## Jobs

### Guest

| #   | Scenario                                                       | Type     | Severity |
| --- | -------------------------------------------------------------- | -------- | -------- |
| 1   | Jobs should be visible                                         | positive | normal   |
| 2   | Job details should be visible                                  | positive | normal   |
| 3   | Jobs should filtered by category                               | positive | normal   |
| 4   | Jobs should filtered by company                                | positive | normal   |
| 5   | Pagination shouldn't be available                              | negative | normal   |
| 6   | Applying for a job shouldn't be available                      | negative | normal   |
| 7   | Newsletter form should subscribe successfully with valid email | positive | normal   |
| 8   | Newsletter should show error when email is empty               | negative | normal   |
| 9   | Newsletter should show error when email is in invalid format   | negative | normal   |

Notes:

- job details = description, salary, employment type, location
- filter by category (just by url that has changed)
- filter by company (image and company name the same for each job in the filtered list)

## Out of scope

### Candidates

### Chats

### Jobs

### Hiring Management
