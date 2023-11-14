const Address = require("../models/Address");


exports.singleAddress = async (req, res) => {
  try {
    
    const { id } = req.params;
    const address = await Product.find({id});
    if(!address){
        return res.status(404).json({ error: 'Address not found' });
    }
    res.status(200).json({
      success: true,
      address: address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

exports.createAddress = async (req, res) => {
  try {
    const {
        street,
        landmark,
        city,
        pin,
        state,
    } = req.body;
    if (!city || !pin ||!state) {
      return res.status(400).json({
        success: false,
        message: "Name and Price fields are required",
      });
    }
    const AddressDetails = await Address.create({
        street:street,
        landmark:landmark,
        city:city,
        pin:pin,
        state:state,
    });
    console.log(AddressDetails);
    return res.status(200).json({
      success: true,
      message: "Address create  Successfully",
      AddressDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

exports.updateAddress= async (req, res) => {    
  
  const {
    _id
  } = req.body;
  

  
    try {
      const updatedAddress = await Address.findByIdAndUpdate(  _id,  req.body, { new: true });
      if (!updatedAddress) {
        return res.status(404).json({ error: 'Address not found' });
      }
      res.status(200).json(updatedAddress);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the address' });
    }
  };
  


exports.deleteAddress = async (req, res) => {
  try {
    const id = req.body._id
    console.log(id)
    const address = await Address.findById({ _id: id })
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not  found",
      })
    }
    await Address.findByIdAndDelete({ _id: id })
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Product Cannot be deleted successfully"
    })
  }
}
