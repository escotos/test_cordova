/********* MFPClient.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>

#import <IMFCore/IMFClient.h>

#import "MFPClient.h"
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
    CDVPluginResult* pluginResult = nil;
    
    NSString* route = [command.arguments objectAtIndex:0];
    NSString* guid = [command.arguments objectAtIndex:0];
    NSLog(@"*********** %@" , route);
    
    IMFClient *imfClient = [IMFClient sharedInstance];
    [imfClient initializeWithBackendRoute:route backendGUID:guid];
    
    NSInteger version = [IMFClient  version];
    
    //pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat:@"%d", (int)version]];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:route];
    //NSLog(@"YO!!! %@",[NSString stringWithFormat:@"%d", (int)version]);
    
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


@end
