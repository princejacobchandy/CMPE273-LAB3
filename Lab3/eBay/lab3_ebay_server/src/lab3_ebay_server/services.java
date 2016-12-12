package lab3_ebay_server;

import javax.jws.WebService;
import java.sql.*;

public class services {
	
	Connection con = null;
    Statement st = null;
    ResultSet rs = null;
	
	
	
	public boolean 
	register(String uname,String pwd_encrypted,String fname,String lname, String email,String bdate, String ulocation, String contact) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("registering new user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute("INSERT INTO userdetails (uname, pword, fname, lname, email, bday, location, contact) VALUES ('"+uname+"', '"+pwd_encrypted+"', '"+fname+"', '"+lname+"', '"+email+"', '"+bdate+"', '"+ulocation+"', '"+contact+"');");
        
       
        while (rs.next()) {
        	System.out.println("reached registration part of server");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return response;
    }
	
	
	
	public boolean 
	login(String username,String pwd_encrypted) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute(" select * from userdetails where email = '"+username+"' and pword = '"+pwd_encrypted+"' ");
        
       
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return response;
    }
	
	
	public String 
	getprofile(String passing_param) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute(" select * from userdetails where email = '"+passing_param+"' ");
       
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return xmlArray.toString();
    }

	
	public String 
	getmyads(String passing_param) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute("  select * from product_table where seller_email = '"+passing_param+"'  ");
      
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return xmlArray.toString();
    }

	

	public String 
	createad(String shandle, String suname, String ptitle, String pdesc, String pqty, String pprice, String semail, String ptype ) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute("  INSERT INTO `ebay`.`product_table` (`seller_handle`, `seller_uname`, `product_name`, `product_description`, `product_qty`, `product_price`, `seller_email`, `product_type`) VALUES ('"+shandle+"','"+suname+"', '"+ptitle+"', '"+pdesc+"', '"+pqty+"', '"+pprice+"', '"+semail+"', '"+ptype+"');  ");
      
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return xmlArray.toString();
    }	
	
	
	public String 
	getads(String passing_param) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute("  select * from product_table where seller_email != '"+passing_param+"' and product_qty!= '0' ");
      
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return xmlArray.toString();
    }	


	public String 
	addtocart(String prodid, String prodqty, String prodname, String proddesc, String prodprice, String prodseller_uname, String prodseller_email, String prod_total_qty ) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute(" INSERT INTO shoppingcart (buyer_uname, product_id, product_qty, product_name, product_desc, product_price, seller_uname, seller_email,product_totalqty ) VALUES ('"+prodid+"', '"+prodid+"', '"+prodqty+"', '"+prodname+"', '"+proddesc+"', '"+prodprice+"', '"+prodseller_uname+"', '"+prodseller_email+"' , '"+prod_total_qty+"') ");
      
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return xmlArray.toString();
    }


	public String 
	placebid(String prodid, String prodqty, String prodname, String proddesc, String prodprice, String prodseller_uname, String prodseller_email, String prod_total_qty ) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		String bidprice="100", prodseller="thenga", prodbuyer="manga";
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute(" INSERT INTO bidding_table (product_id, product_name, product_desc, product_qty, product_seller, product_buyer, bid_price, actual_price) VALUES ('"+prodid+"', '"+prodname+"', '"+proddesc+"', '"+prodqty+"', '"+prodseller+"', '"+prodbuyer+"', '"+bidprice+"', '"+prodprice+"');");
      
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return xmlArray.toString();
    }
	
		public String 
	getthecart(String passing_param ) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute(" select * from shoppingcart where buyer_uname = '"+passing_param+"'");
      
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return xmlArray.toString();
    }


	
	
			public String 
	addaddresstodb(String address1, String address2, String address3,String address4, String address5, String email)
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute(" UPDATE `ebay`.`userdetails` SET `addressline1`='"+address1+"', `addressline2`='"+address2+"', `addresscity`='"+address3+"', `addressstate`='"+address4+"', `addresspin`='"+address5+"' where email = '"+email+"' ");
      
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return xmlArray.toString();
    }
	

	
	
	
				public String 
	finalcheckout(String product_id, String product_name, String product_qty, String product_price, String buyer_name, String seller_name, String totalamt,
	String totalitems, String buyer_address, String bill_payment) 
	throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
    	System.out.println("signin user");
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager
                .getConnection("jdbc:mysql://localhost/ebay?"
                                + "user=root&password=1234");
        st = con.createStatement();
        StringBuffer xmlArray = new StringBuffer("<results>");
        boolean response=false;
        try{
        	 response = st.execute(" INSERT INTO bill_table (product_id, product_name, product_qty, product_price, buyer_name, seller_name, totalamt, totalitems, buyer_address,bill_payment) VALUES ('"+product_id+"', '"+product_name+"', '"+product_qty+"', '"+product_price+"', )");
      
        while (rs.next()) {
        	System.out.println("user login");
            int total_rows = rs.getMetaData().getColumnCount();
            xmlArray.append("<result ");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append(" " + rs.getMetaData().getColumnLabel(i + 1)
                    .toLowerCase() + "='" + rs.getObject(i + 1) + "'");
            }
            xmlArray.append(" />");
        }
        xmlArray.append("</results>");
        }
        catch(Exception e){
        	System.out.println(e.getMessage());
        }
        
        return xmlArray.toString();
    }

	
}


