Feature: Assignments

  Background:
    Given a car plated ANY-234

  Scenario: A car checks-in the parking lot
    When it is assigned to a lot
    Then we get a response with a message saying "Successful"

  Scenario: A car checks-out the parking lot
    And it is assigned to a lot
    When it is unassigned to a lot
    Then we get a response with a message saying "Successful"
    And lot should be empty

  # Scenario: A car checks-in a full parking lot
  #   When it is assigned to a lot
  #   Then we get a response with a message saying "Successful"

  # Scenario: A car checks-in a occupied lot
  #   When it is assigned to a lot
  #   Then we get a response with a message saying "Successful"
