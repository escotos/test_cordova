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
        
//        // process the body
//        if let body  = requestDict.objectForKey("body") as? NSDictionary {
//            //let bodyData = body!.
//            //nativeRequest.setHTTPBody(<#T##data: NSData!##NSData!#>)
//        }
//        else{
//            let body = requestDict.objectForKey("body") as? String
//            let bodyData = body!.dataUsingEncoding(NSUTF8StringEncoding)
//            nativeRequest.setHTTPBody(bodyData)
//        }
        
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

    func send(command: CDVInvokedUrlCommand) {

        let nativeRequest = unPackRequest(command.arguments[0] as! NSDictionary)
        
        nativeRequest.sendWithCompletionHandler { (response: IMFResponse!, error: NSError!) -> Void in
            if (error != nil) {
                // process the error
                print("Error  in ViewController\(error.localizedDescription)")
                let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAsString: error.localizedDescription)
                self.commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
            } else {
                // process success
                print("Response in ViewController \(response)")
                print("Response text in ViewController \(response.responseText)")
                let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: response.responseText)
                self.commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
            }
        } // end send
    } // end func
} // end plugin
