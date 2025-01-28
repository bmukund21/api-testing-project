const checkout = {
    validPayload: {
      book_id: '123e4567-e89b-12d3-a456-426614174000',
      quantity: 2,
      price: 50,
    },
    missingToken: {
      book_id: '123e4567-e89b-12d3-a456-426614174000',
      quantity: 2,
      price: 50,
    },
    paymentDecline: {
      book_id: '123e4567-e89b-12d3-a456-426614174000',
      quantity: 2,
      price: 150,
    },
    missingFields: {
      book_id: '123e4567-e89b-12d3-a456-426614174000',
    },
  };
  
  export default checkout;