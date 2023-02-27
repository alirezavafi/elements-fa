import { HttpSecurityScheme, IOauth2Flow, IOauth2SecurityScheme, IOauthFlowObjects } from '@stoplight/types';
import { entries, keys } from 'lodash';

import {
  isOauth2AuthorizationCodeFlow,
  isOauth2ClientCredentialsOrPasswordFlow,
  isOAuth2ImplicitFlow,
} from './oas/security';

const oauthFlowNames: Record<keyof IOauthFlowObjects, string> = {
  implicit: 'Implicit',
  authorizationCode: 'Authorization Code',
  clientCredentials: 'Client Credentials',
  password: 'Password',
};

export function getDefaultDescription(scheme: HttpSecurityScheme) {
  switch (scheme.type) {
    case 'apiKey':
      return getApiKeyDescription(scheme.in, scheme.name);
    case 'http':
      switch (scheme.scheme) {
        case 'basic':
          return getBasicAuthDescription();
        case 'bearer':
          return getBearerAuthDescription();
        case 'digest':
          return getDigestAuthDescription();
      }
    case 'oauth2':
      return getOAuthDescription(scheme);
  }

  return '';
}

function getApiKeyDescription(inProperty: 'header' | 'cookie' | 'query', name: string) {
  return `این سرویس توسط مکانیزم API-Key محافظت شده است و برای استفاده از آن می بایست پارامتر \`${name}\` در قسمت ${inProperty} لحاظ شود.

  مثال: ${inProperty === 'query' ? `\`?${name}=123\`` : `\`${name}: 123\``}`;
}

function getBasicAuthDescription() {
  return `این سرویس از طریق Basic Authentication قابل دسترس می باشد و برای استفاده از آن می بایست نام کاربری را بصورت Base64 بصورت \`username:password\` ارسال نمایید

  مثال: \`Authorization: Basic ZGVtbzpwQDU1dzByZA==\``;
}

function getBearerAuthDescription() {
  return `این سرویس توسط توکن Bearer قابل دسترس می باشد و برای استفاده از آن می بایست این توکن را در Authorization Header تنظیم نمایید

  مثال: \`Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia...\``;
}

function getDigestAuthDescription() {
  return `این سرویس با استفاده از مکانیزم Digest Authentication در دسترس می باشد 

  مثال: \`Authorization: Digest username=guest, realm="test", nonce="2", uri="/uri", response="123"\``;
}

function getOAuthDescription(scheme: IOauth2SecurityScheme) {
  const flows = keys(scheme.flows);
  return flows.map(flow => getOAuthFlowDescription(oauthFlowNames[flow], scheme.flows[flow])).join('\n\n');
}

function getOAuthFlowDescription(title: string, flow: IOauth2Flow) {
  let description = '<div></div><div style="direction:ltr">' + `<strong>${title} OAuth Flow</strong>`;

  description +=
    isOAuth2ImplicitFlow(flow) || isOauth2AuthorizationCodeFlow(flow)
      ? `\n\nAuthorize URL: ${flow.authorizationUrl}`
      : '';

  description +=
    isOauth2AuthorizationCodeFlow(flow) || isOauth2ClientCredentialsOrPasswordFlow(flow)
      ? `\n\nToken URL: ${flow.tokenUrl}`
      : '';

  description += flow.refreshUrl ? `\n\nRefresh URL: ${flow.refreshUrl}` : '';
  description += '</div><div style="direction:rtl">';
  const scopes = entries(flow.scopes);
  if (scopes.length) {
    description += `\n\nاسکوپ ها (Scopes):
${scopes.map(([key, value]) => `- \`${key}\` - ${value}`).join('\n')}`;
  }
  description += '</div></div>';

  return description;
}
