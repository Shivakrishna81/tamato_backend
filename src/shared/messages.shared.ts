export const enum messages{
    //user success
    UC="User Created Successfully!",
    UD="User Deleted Successfully!",
    UF="User Fetched Successfully!",
    UF1="Users Fetched Successfully!",

    //user Errors 
    UEC="Error While Creating a user!",
    UEE="User Already Existed!",
    UENF="User Not Found!",
    UFF="Failed to fetch User!",
    UEL="Failed to login!",
    UIP="Invalid Password!",

    //items success
    IC="Item Created Successfully!",
    ID="Item Deleted Successfully!",
    IF="Item Fetched Successfully!",
    IF1="Items Fetched Successfully!",

    //item errors
    IEC="Error While Creating Item!",
    IENF="Item Not Found!",
    IEF="Error While Fetching Items!",
    IED="Error while Deleting Item!",

    //cart success
    CIE="Item updated due to existed!",
    CIC="Added Item to cart successfully!",
    CIF="Cart Items Fetched successfully!",

    //Cart errors 
    CEA="Error while adding item to cart!",
    CIEF="Error while Fetching cartItems!",
    CIED="Error while Deleting cart item!",
    
    //common error 
    ISE="Internal Server Error",
    CEF="You don't have an access to do this action!",
    CEUA="Not authorized user!"
}