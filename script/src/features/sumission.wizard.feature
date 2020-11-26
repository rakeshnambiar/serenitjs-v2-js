Feature: Submit new Manuscript through xPub

  In order to submit a new manuscript
  As an admin user
  I should have the provision in the xPub system

  @RegressionTest
  Scenario:  TC#02 - To verify the login functionality of Admin user
    Given I am an Admin user
    When I login to the xPub system with the admin credential
      | admin | xx |
    Then I should able to see the xPub landing page
