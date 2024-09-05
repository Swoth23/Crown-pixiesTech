// Handling PayPal Payment
document.getElementById('paypal-button').addEventListener('click', () => {
  // Call PayPal API here
  alert("Redirecting to PayPal...");
});

// Handling Paystack Payment
document.getElementById('paystack-button').addEventListener('click', () => {
  // Example: Initializing Paystack Payment
  let handler = PaystackPop.setup({
      key: 'your-paystack-public-key',
      email: 'customer-email@example.com',
      amount: 5000 * 100, // 5000 NGN
      currency: "NGN",
      callback: function(response){
          alert('Payment successful. Transaction ref is ' + response.reference);
      },
      onClose: function(){
          alert('Transaction was not completed.');
      }
  });
  handler.openIframe();
});

// Handling Flutterwave Payment
document.getElementById('flutterwave-button').addEventListener('click', () => {
  FlutterwaveCheckout({
      public_key: "your-flutterwave-public-key",
      tx_ref: "hooli-tx-1920bbtyt",
      amount: 5000,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
          email: "customer-email@example.com",
          phone_number: "08012345678",
          name: "John Doe",
      },
      callback: function (data) {
          alert("Payment successful. Transaction ID: " + data.transaction_id);
      },
      onclose: function() {
          alert('Transaction was not completed.');
      },
  });
});

// Bank Transfer - Show Transfer Details
document.getElementById('bank-transfer-button').addEventListener('click', () => {
  alert('Please transfer to: Account Name, Bank Name, Account Number');
});
