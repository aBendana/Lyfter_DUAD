class BankAccount():
    
    def __init__(self):
        self.balance = 0

        
    def deposit_money(self, amount):
        self.balance = self.balance + amount
        print(f"Your new balance is: ${self.balance}")


    def withdraw_money(self, amount, min_balance):
        if (min_balance <= (self.balance - amount)):
            self.balance = self.balance - amount
            print(f"Your new balance is: ${self.balance}")
        else:
            print("Error: YOU CAN'T TAKE OUT THAT AMOUNT")
            print(f"Your balance can't be less than ${min_balance}")


class SavingAccount(BankAccount):

    def __init__(self):
        #two ways to bring initial balance
        #balance = super().__init__()
        balance = BankAccount.__init__(self)
        
        validation = True
        while validation == True:
            try:
                self.minimum_balance = int(input("\nHow much is the minimum balance to leave in your account: $"))
                validation = False
            except ValueError as error:
                print("\033[3;31mPlease ONLY numbers\033[0m")


def menu():
    print("""
        What would you like to do:
            1. Deposit money
            2. Withdraw money
            3. Exit
        """)
    
    validation = True
    while validation == True:
        try:
            option = int(input("Choose an option: "))
            while((option<=0) or (option>3)):
                print("\033[3;31mOption must be number in the menu\033[0m")
                option = int(input("Choose an option: "))
            validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            validation == True
    
    return option


def input_amount():
    validation = True
    while validation == True:
        try:
            amount = int(input("$"))
            validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            validation == True
    return amount


def main():
    my_saving_account = SavingAccount()

    validation = True
    while validation == True:
        option = menu()
        if option == 1:
            print(f"Your current balance is: ${my_saving_account.balance}")
            print("How much do you want to deposit:")
            amount = input_amount()
            my_saving_account.deposit_money(amount)
        elif option == 2:
            print(f"Your current balance is: ${my_saving_account.balance}")
            print("How much do you want to withdraw:")
            amount = input_amount()
            min_balance = my_saving_account.minimum_balance
            my_saving_account.withdraw_money(amount, min_balance)
        elif option == 3:
            print("Have a nice day!\n")
            exit()


main()