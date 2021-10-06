Feature: Cars Blacklisting

  Scenario: A banned car tries to park in the lot
    Given a car plated GCH-641 is banned
    When that car tries to be assigned to a lot
    Then we get an error saying "Car GCH-641 is Banned"

  Scenario: A car gets unbanned and is assigned to a lot
    Given a car plated ATF-124
    When it arrives into the parking lot, the car is unbanned
    And is assigned to a lot
    Then we get an message saying "Successful"
