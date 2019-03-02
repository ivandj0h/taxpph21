# TAXPPH21 APPLICATION

                                                                             TECH_DEV_TEST_IVANDI DJOH GAH 

## ABOUT THE PROGRAM
   This Program was made to Answer the Question of the Recruiters about Indonesia's Income Taxation. 
   All of the Calculation on this Program based on Director General of Tax Regulation Number PER-32/PJ/2015 
   concerning Article 21 Income Tax, the definition of Income Tax 21 is a tax on income in the form of salary, 
   wages, honorarium, allowances and other payments in name and in any form relating to work or position, 
   services, and activities carried out by individuals subject to domestic tax.

## EXAMPLE CASE
   To understand how it works, i'll give you two examples case.
   
      1. Tax Calc without adding Tax reliefs
      
         John Doe is an employee at DOE Corp, as an engineer he gets a salary of 25,000,000 every month.
         DOE Corp participates in the Employment BPJS program, Work Accident Insurance and Death Guarantee 
         Insurance paid by the employer with an amount of 0.50% and 0.30% of salary, respectively.
         DOE Corp bears monthly JHT fees of 3.70% of salary while John Doe pays JHT fees of 2.00% of salary 
         each month. In addition, Doe Corp also participates in retired programs for its employees.
         DOE Corp pays retirement contributions to John Doe to retired funds, whose establishment has been 
         approved by the Minister of Finance, every month Rp 200,000
         
         # INCOME
         Monthly Income............................ Rp. 25,000,000
         Work Accident Insurance....................Rp. 125,000     (0,50% x Monthly Income)
         Death Guarantee Insurance..................Rp. 75,000      (0.30% x Monthly Income)
         
         Gross Income Monthly.......................Rp. 25,200,000
         Gross Income Annualy.......................Rp. 302,400,000 (12 x Gross Income Monthly)
         
         # EXPENSES
         Position Expenditure.......................Rp. 1,260,000   (5% x Gross Income Monthly)  
         
         Net Income Monthly.........................Rp. 23,580,000
         Net Income Annualy.........................Rp. 282,960,000 (12 x Net Income Monthly)
         
         # PTKP
         PTKP.......................................Rp. 54,000,000
         
         # TAX
         Annual taxable income......................Rp. 228,960,000
         Annual Tax on this Income..................Rp. 40,740,000
         
   
## INSTALLATION
   Here are some ways to be able to run this application without errors (CORS issue).

      1. Clone this Repository https://github.com/ivandi1980/taxpph21.git
      2. Extract the .zip into your local server / public folder
      3. Run your local server e.g: http://127.0.0.1:5500
      4. Please run it using http-server and do not click directly on index.html to avoid an error

## HOW TO USE THE PROGRAM
   Here are some ways to be able to use this application.
   
      1. If you want to Run this Application Based on the Question Number One 
         which is follow the Rules of Indonesia’s Government about income taxation, 
         You can run it "WITHOUT tick the CHECKBOX Allowence" on the Application.
      2. If you tick the "CHECKBOX" then it will run the Question Number Two(Tax reliefs).
