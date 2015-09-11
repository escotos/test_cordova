/********* MFPResourceRequest.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import "MFPResourceRequest.h"
#import <IMFCore/IMFResourceRequest.h>
#import <IMFCore/IMFResponse.h>

@implementation MFPResourceRequest

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

- (void)send:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    NSString* args = [command.arguments objectAtIndex:0];
    //NSString* guid = [command.arguments objectAtIndex:0];
    NSLog(@"*********** %@" , args);
 
    //BEGIN LEN DEBUG TEST MAKING A REQUEST
    // create a request
    NSString* path = @"http://lnickers-core-test.mybluemix.net/yo";
    NSString* method = @"GET";
    NSDictionary* parameters = @{@"key1":@"Eezy",@"key2": @"Tutorials"};;
    NSTimeInterval timeoutInterval = 60000;
    IMFResourceRequest* imfResourceRequest = [IMFResourceRequest requestWithPath:path method:method parameters:parameters timeout:timeoutInterval];

   
    // set http body
    NSString* httpBodyString = @"{\"AAA\":\"AAA\",\"BBB\":\"BBB\"}";
    NSData* httpBody = [httpBodyString dataUsingEncoding:NSUTF8StringEncoding];
    [imfResourceRequest setHTTPBody:httpBody];
    

    // set a header
    [imfResourceRequest setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    
    // update the timeout interval
    [imfResourceRequest setTimeoutInterval:50000];
    
    // set the request method
    [imfResourceRequest setHTTPMethod:@"GET"];


    //[imfResourceRequest sendWithCompletionHandler:<#^(IMFResponse *response, NSError *error)completionHandler#>];
    [imfResourceRequest sendWithCompletionHandler:^(IMFResponse *response, NSError *error) {
        if (error) {
            NSLog(@"YO!!! %@",[NSString stringWithFormat:@"%@", [error description]]);
        }
        else{
            NSLog(@"YO!!! %@",[NSString stringWithFormat:@"%@", [response responseText]]);
        }

    }];

     
    //pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat:@"%d", (int)version]];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:args];
    //NSLog(@"YO!!! %@",[NSString stringWithFormat:@"%d", (int)version]);
    
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
@end
