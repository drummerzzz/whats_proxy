export interface VeryfiWebhookParams {
    'hub.mode': string;
    'hub.challenge': number;
    'hub.verify_token': string;
}
