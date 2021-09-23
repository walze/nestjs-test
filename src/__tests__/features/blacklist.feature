Feature: Cars Blacklisting

  Scenario: A banned car tries to park in the lot
    Given a car plated GCH-641 is banned
    When that car tries to be assigned to a lot
    Then that car should not be allowed to be assigned
