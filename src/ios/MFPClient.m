/********* MFPClient.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>

#import "IMFClient.h"

- (void)coolMethod:(CDVInvokedUrlCommand*)command;
@end

@implementation MFPClient

- (void)coolMethod:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = [command.arguments objectAtIndex:0];

    if (echo != nil && [echo length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void) initialize:(CDVInvokedUrlCommand*)command
{
    NSString* route = [command.arguments objectAtIndex:0];
    NSString* guid = [command.arguments objectAtIndex:0];
    [client initializeWithBackendRoute backendRoute: route backendGUID: guid];
}

@end
