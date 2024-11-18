export const enum messages{
    //user success
    UC="User Created Successfully!",
    UD="User Deleted Successfully!",
    UF="User Fetched Successfully!",
    UU="User Updated successfully1",
    UF1="Users Fetched Successfully!",

    //user Errors 
    UEC="Error While Creating a user!",
    UUE="Error while Updating the user!",
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
    IU="Item Updated Successfully!",

    //item errors
    IEC="Error While Creating Item!",
    IENF="Item Not Found!",
    IEF="Error While Fetching Items!",
    IED="Error while Deleting Item!",
    IEU="Error while Updating Item!",

    //cart success
    CIE="Item updated due to existed!",
    CIC="Added Item to cart successfully!",
    CIF="Cart Items Fetched successfully!",
    CIQD="Item removed from cart!",
    CIQU="Cart Item Quantity Updated Successfully!",

    //Cart errors 
    CEA="Error while adding item to cart!",
    CIEF="Error while Fetching cartItems!",
    CIED="Error while Deleting cart item!",
    CIEQU="Error while updating cart quantity!",


    //order success 
    OCS="Order create Successfully!",
    OFS="Orders Fetched successfully!",
    OUS="Order updated successfully!",
    OCAS="Order Cancelled Successfully!",


    //order error
    OEC="Error While Creating order!",
    OEF="Error while fetching orders!",
    OEU="Error while Updating order!",

    //Address Success
    ACS="Address Created Successfully!",
    AFS="Address Fetched Successfully!",


    //Address Error
    AEC="Error while creating address!",
    AEF="Error while fetching address!",


    //Category Success 
    CAFS="Categories fetched successfully!",
    CACS="Category Created Successfully!",

    //Category error 
    CAEF="Error while fetching categories!",
    CAEC="Error while creating category!",
    
    //common error 
    ISE="Internal Server Error",
    CEF="You don't have an access to do this action!",
    CEUA="Not authorized user!",

    //common 
    NC="No content found!"
}