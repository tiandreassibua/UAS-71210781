Feature: Transfer Funds Functionality

    Scenario: Successful fund transfer
        Given I am logged in as "john" with password "demo"
        When I transfer "100" dollars from one account to another
        Then I should see a confirmation message "Transfer Funds"

    Scenario: Transfer fails with empty amount
        Given I am logged in as "john" with password "demo"
        When I try to transfer "" dollars from one account to another
        Then I should see a validation message

    Scenario: Transfer fails with negative amount
        Given I am logged in as "john" with password "demo"
        When I try to transfer "-50" dollars from one account to another
        Then I should see a validation message
