Feature: Cars Blacklisting

  Scenario: A banned car tries to enter the parking lot
    Given a car plated ONE is banned
    When that car tries to be assigned to a lot
    Then we get an error saying "Car ONE is Banned"

  Scenario: A car gets unbanned and is assigned to a lot
    Given a car plated TWO
    When it arrives into the parking lot, the car is unbanned
    And is assigned to a lot
    Then we get an message saying "Successful"
