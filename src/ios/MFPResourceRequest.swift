//
//  MFPResourceRequest.swift
//  HelloCordova
//
//  Created by Larry Nickerson on 9/15/15.
//
//

import Foundation
import IMFCore

@objc(MFPResourceRequest) class MFPResourceRequest : CDVPlugin {
    
    func send(command: CDVInvokedUrlCommand) {
        
        let nativeRequest = unPackRequest(command.arguments[0] as! NSDictionary)
        
        nativeRequest.sendWithCompletionHandler { (response: IMFResponse!, error: NSError!) -> Void in
            if (error != nil) {
                // process the error
                let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAsString: error.localizedDescription)
                self.commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
            } else {
                // process success
                let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: self.packResponse(response))
                self.commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
            }
        } // end send
    } // end func send
    
    func sendFormParameters(command: CDVInvokedUrlCommand) {
        
        let nativeRequest = unPackRequest(command.arguments[0] as! NSDictionary)
        
        nativeRequest.sendWithCompletionHandler { (response: IMFResponse!, error: NSError!) -> Void in
            if (error != nil) {
                // process the error
                let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAsString: error.localizedDescription)
                self.commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
            } else {
                // process success
                let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: self.packResponse(response))
                self.commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
            }
        } // end send
    } // end func sendFormParameters
    
    func unPackRequest(requestDict:NSDictionary) -> IMFResourceRequest {
        
        // create a native request
        let url     = requestDict.objectForKey("url") as! String
        let nativeRequest = IMFResourceRequest(path: url)
        
        // method
        let method  = requestDict.objectForKey("method") as? String
        nativeRequest.setHTTPMethod(method)
        
        // get the query parameters
        let requestQueryParamsDict = requestDict.objectForKey("queryParameters") as! Dictionary<String,String>
        nativeRequest.setParameters(requestQueryParamsDict)
        
        // timeout
        let timeout = requestDict.objectForKey("timeout") as? Int
        nativeRequest.setTimeoutInterval(NSTimeInterval( timeout! ) )
        
        // process the body
        if let body  = requestDict.objectForKey("body") as? NSDictionary {
            
            //BEGIN LEN DEBUG
            //let bodyData = body!.
            //nativeRequest.setHTTPBody(data: NSData!)
            print("!!! !!! !!! !!! BODY IS A DICTIONARY !!! !!! !!! !!!", appendNewline: false)
            //END LEN DEBUG
        }
        else {
            if let body = requestDict.objectForKey("body") as? String {
                let bodyData = body.dataUsingEncoding(NSUTF8StringEncoding)
                nativeRequest.setHTTPBody(bodyData)
            }
        }
        
        // get the headers
        let requestHeaderDict = requestDict.objectForKey("headers") as! Dictionary<String,[String]>
        let requestHeaderNamesArray = Array(requestHeaderDict.keys)
        var flattenedHeaders : Dictionary<String, String> = [:]
        
        for name in requestHeaderNamesArray {
            var headerString: String = ""
            
            // combine mutli-valued headers into a string
            for header in requestHeaderDict[ name ]!
            {
                headerString += "\(header) "
            }
            
            // trim the trailing space
            headerString = headerString.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceCharacterSet())
            
            // add the flattened headers to a dictionary
            flattenedHeaders[name] = headerString
        }
        
        return nativeRequest
    }
    
    func packResponse(response: IMFResponse!) -> String {
        
        let jsonResponse:NSMutableDictionary = [:]
        
        
        jsonResponse.setObject(Int(response.httpStatus), forKey: "httpStatus")
        jsonResponse.setObject(response.responseHeaders, forKey: "responseHeaders")
        
        
        let responseText: String = (response.responseText != nil)    ? response.responseText : ""
        jsonResponse.setObject(responseText, forKey: "responseText")
        
        if response.responseJson != nil && NSJSONSerialization.isValidJSONObject(response.responseJson) {
            jsonResponse.setObject(response.responseJson, forKey: "responseJSON")
        }
        else {
            jsonResponse.setObject("", forKey: "responseJSON")
        }
        
        
        // return the json string
        print(self.JSONStringify(jsonResponse, prettyPrinted: true))
        return self.JSONStringify(jsonResponse);
    }
    
    func JSONStringify(value: AnyObject,prettyPrinted:Bool = false) -> String{
        
        let options = prettyPrinted ? NSJSONWritingOptions.PrettyPrinted : NSJSONWritingOptions(rawValue: 0)
        
        if NSJSONSerialization.isValidJSONObject(value) {
            var serializationError: NSError?
            do {
                let data = try NSJSONSerialization.dataWithJSONObject(value, options: options)
                
                if let string = NSString(data: data, encoding: NSUTF8StringEncoding) {
                    return string as String
                }
                
                if (serializationError != nil){
                    print("error")
                    //Access error here
                }
            } catch {
            }
        }
        return ""
    }
} // end plugin
