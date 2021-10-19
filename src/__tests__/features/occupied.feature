Feature: Occupied

  Background:
    Given a car plated ANY-345

  Scenario: A car checks-in a full parking lot
    When the parking lot is full
    And it is assigned to a lot
    Then we get a response with a message saying "No available with empty lot"

  # Scenario: A car checks-in a occupied lot
  #   When it is assigned to a occupied lot
  #   Then we get a response with a message saying "Successful"
