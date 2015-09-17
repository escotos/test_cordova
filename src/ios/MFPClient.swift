//
//  MFPClient.swift
//  HelloCordova
//
//  Created by Larry Nickerson on 9/15/15.
//
//
import Foundation
import IMFCore

@objc(MFPClient) class MFPClient : CDVPlugin {
    
    func initialize(command: CDVInvokedUrlCommand) {

        let route = command.arguments[0] as! String
        let guid = command.arguments[0] as! String

        let client = IMFClient.sharedInstance()
        client.initializeWithBackendRoute(route, backendGUID: guid)

        var pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: "")
        commandDelegate.sendPluginResult(pluginResult, callbackId:command.callbackId)
    }
}