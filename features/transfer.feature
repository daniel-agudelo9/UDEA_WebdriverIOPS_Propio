Feature: ParaBank Transfer

  Background:
    Given I am on the login page
    When I login with John and demo

  Scenario Outline: As a user, I can make transfer from one account to another
    Given I am on the transfer page
    When I write the <amount> to transfer from the account <FromAccount> to the account <ToAccount> and press transfer
    Then I see <message>

  Examples:
  |   amount   |   fromAccount   |   toAccount   |       message        |
  |    1     |      13011      |     12789     |  Transfer Complete!  | 
  |            |      12345      |     13011     |       Error!        |
    
  
