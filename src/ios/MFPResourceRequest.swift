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
                let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAsString: self.packResponse(response,error: error))
                self.commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
            } else {
                // process success
                let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: self.packResponse(response))
                self.commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
            }
        } // end send
    } // end func send

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
        if let body = requestDict.objectForKey("body") as? String {
            let bodyData = body.dataUsingEncoding(NSUTF8StringEncoding)
            nativeRequest.setHTTPBody(bodyData)
        }

        //TODO Verify dictionary is string to string or string to list of strings now that api changed
        // get the headers
        let requestHeaderDict = requestDict.objectForKey("headers") as! Dictionary<String,String>
        let requestHeaderNamesArray = Array(requestHeaderDict.keys)

        for name in requestHeaderNamesArray {
            nativeRequest.setValue(requestHeaderDict[ name ]!, forHTTPHeaderField: name)
        }

        return nativeRequest
    }
    
    func packResponse(response: IMFResponse!,error:NSError?=nil) -> String {
        
        let jsonResponse:NSMutableDictionary = [:]
        
        if error != nil {
            jsonResponse.setObject(Int((error!.code)), forKey: "errorCode")
            jsonResponse.setObject((error!.localizedDescription), forKey: "errorDescription")
        }
        else {
            jsonResponse.setObject(Int((0)), forKey: "errorCode")
            jsonResponse.setObject("", forKey: "errorDescription")
        }
        
        if (response == nil)
        {
            jsonResponse.setObject("", forKey: "responseText")
            jsonResponse.setObject([], forKey:"headers")
            jsonResponse.setObject(Int(0), forKey:"status")
        }
        else {
                let responseText: String = (response.responseText != nil)    ? response.responseText : ""
                jsonResponse.setObject(responseText, forKey: "responseText")
                
                // if we have an error we have no response headers
                if response.responseHeaders != nil {
                    jsonResponse.setObject(response.responseHeaders, forKey:"headers")
                }
                else{
                    jsonResponse.setObject([], forKey:"headers")
                }
                
                jsonResponse.setObject(Int(response.httpStatus), forKey:"status")
        }
        
        // return the json string
        print(self.JSONStringify(jsonResponse, prettyPrinted: true))
        return self.JSONStringify(jsonResponse);
    }
    
    func JSONStringify(value: AnyObject,prettyPrinted:Bool = false) -> String{
        
        let options = prettyPrinted ? NSJSONWritingOptions.PrettyPrinted : NSJSONWritingOptions(rawValue: 0)
        
        if NSJSONSerialization.isValidJSONObject(value) {
            
            do {
                let data = try NSJSONSerialization.dataWithJSONObject(value, options: options)
                
                if let string = NSString(data: data, encoding: NSUTF8StringEncoding) {
                    return string as String
                }
                
            } catch  {
                
            }
        }
        return ""
    }
} // end plugin
