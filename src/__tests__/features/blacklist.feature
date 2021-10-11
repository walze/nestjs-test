Feature: Cars Blacklisting

  Background:
    Given a banned car plated ANY-123

  Scenario: A banned car tries to enter the parking lot
    When that car tries to be assigned to a lot
    Then we get an error saying "Car ANY-123 is Banned"

  Scenario: A car gets unbanned and is assigned to a lot
    When it enters the parking lot, the car is unbanned
    And is assigned to a lot
    Then we get a response with a message saying "Successful"
