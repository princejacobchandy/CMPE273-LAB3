package lab3_calculator_server;

import javax.jws.WebService;

@WebService
public class Home {

	public double home(double source, double destination, String opcode){
		System.out.println(source + ", " + destination + ", " + opcode);
		double result=0;
		if(opcode.equals("ADD"))
		{
		result=source + destination;
		}
		else if(opcode.equals("SUB"))
		{
		result=source - destination;
		}
		else if(opcode.equals("MUL"))
		{
		result=source * destination;
		}
		else if(opcode.equals("DIV"))
		{
		result=source / destination;
		}
		return result;
	}

}








