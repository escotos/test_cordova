//
//  MFPClient.swift
//  HelloCordova
//
//  Created by Larry Nickerson on 9/15/15.
//
//
import Foundation

@objc(MFPClient) class MFPClient : CDVPlugin {
    
    func initialize(command: CDVInvokedUrlCommand) {
        
        // split the input string into an array of integers
        var inputString = command.arguments[0] as! String
//        var numbersStringArray = split(inputString) {$0 == ","}
//        var intArray = map(numbersStringArray) { String($0).toInt() ?? 0 }
//        
//        // calculate the average
//        var count = intArray.count
//        var sum = intArray.reduce(0,combine: {$0 + $1})
//        var avg = 0.0;
//        
//        // prevent divide by zero
//        if (count > 0){
//            avg = Double(sum) / Double(count)
//        }
//        
//        // return the result as a json string
//        let jsonObject: AnyObject = ["sum": sum, "avg": avg]
//        var jsonResultString = JSONStringify(jsonObject, prettyPrinted:false)
//        
//        // return the json stringified results object to the caller
//        var pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: jsonResultString)
//        commandDelegate.sendPluginResult(pluginResult, callbackId:command.callbackId)
    }
}

// NOTE:
//JSON UTILITY TO CONVERT TO A JSON STRING... move to its own file
//COULD NOT IMPORT a separate swift class file yet e.g.  Json.swift because the import UBER_CALC statement fails.
//likely because the target has a space in the name  i.e. UBER CALC.  next time I will name the project without spaces as a test
func JSONStringify(value: AnyObject,prettyPrinted:Bool = false) -> String{
    
//    let options = prettyPrinted ? NSJSONWritingOptions.PrettyPrinted : NSJSONWritingOptions(rawValue: 0)
//    
//    if NSJSONSerialization.isValidJSONObject(value) {
//        var serializationError: NSError?
//        let data = NSJSONSerialization.dataWithJSONObject(value, options: options,error:&serializationError)
//        
//        if let string = NSString(data: data!, encoding: NSUTF8StringEncoding) {
//            return string as String
//        }
//        
//        if (serializationError != nil){
//            print("error")
//            //Access error here
//        }
//    }
    return ""
}

//
//
//- (void)coolMethod:(CDVInvokedUrlCommand*)command
//{
//    CDVPluginResult* pluginResult = nil;
//    NSString* echo = [command.arguments objectAtIndex:0];
//    
//    if (echo != nil && [echo length] > 0) {
//        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
//    } else {
//        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
//    }
//    
//    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//    }
//    
//    
//    - (void) initialize:(CDVInvokedUrlCommand*)command
//{
//    CDVPluginResult* pluginResult = nil;
//    
//    NSString* route = [command.arguments objectAtIndex:0];
//    NSString* guid = [command.arguments objectAtIndex:0];
//    NSLog(@"*********** %@" , route);
//    
//    IMFClient *imfClient = [IMFClient sharedInstance];
//    [imfClient initializeWithBackendRoute:route backendGUID:guid];
//    
//    NSInteger version = [IMFClient  version];
//    
//    //pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat:@"%d", (int)version]];
//    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:route];
//    //NSLog(@"YO!!! %@",[NSString stringWithFormat:@"%d", (int)version]);
//    
//    
//    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//}
