window.jsPDF = window.jspdf.jsPDF;

// // Define the invoice data
const invoice = {
  customer: {
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St, Anytown, India",
  },
  items: [
  ],

  total: 12390,
};


function save() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    // Add the invoice header
    doc.setFont("helvetica"); // font family
    doc.setFontSize(18); // font size
    doc.setTextColor("#3C3C3C");
    doc.text("The Indian Mart", 14, 22);
    
    // Add the customer information
    doc.setFontSize(12);
    doc.text(`Customer Name: ${invoice.customer.name}`, 14, 40);
    doc.text(`Customer Email: ${invoice.customer.email}`, 14, 48);
    doc.text(`Customer Address: ${invoice.customer.address}`, 14, 56);
    
    // Add the invoice items
    doc.setFontSize(14);
    doc.setTextColor("#000000");
    doc.text("ID", 14, 80);
    doc.text("Category", 24, 80);
    doc.text("Product Name", 60, 80);
    doc.text("Quantity", 107, 80);
    doc.text("Product MRP", 136, 80);
    doc.text("Mart Price", 176, 80);
    
    let y = 88;
    invoice.items.forEach((item) => {
      doc.setFontSize(10);
      doc.setTextColor("#3C3C3C");
      doc.text(item.id.toString(), 14, y);
      doc.text(item.Categor.toString(), 24, y);
      doc.text(item.ProductName.toString(), 60, y);
      doc.text(item.quantity.toString(), 107, y);
      doc.text(item.mrp.toString(), 136, y);
      doc.text(item.price.toFixed(2), 176, y);
      y += 8;
    });
    
    // Add the invoice total
    doc.setFontSize(16);
    doc.text(`Total: $${invoice.total.toFixed(2)}`, 14, y + 16);
    
    // Save the PDF
    
      doc.save("invoice.pdf");
    }
