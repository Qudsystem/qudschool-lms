param(
  [string]$Domain = "192.168.1.5",
  [string]$OutDir = "c:\Users\Eng.Hossam Galal-PC\Desktop\school\certs"
)

# Create output directory
New-Item -ItemType Directory -Path $OutDir -Force | Out-Null

# Create a self-signed cert in LocalMachine\My for the domain/IP
$cert = New-SelfSignedCertificate -DnsName $Domain -CertStoreLocation "Cert:\LocalMachine\My" -NotAfter (Get-Date).AddYears(2)

# Export certificate (PEM) and private key (PFX -> then extract)
$pfxPath = Join-Path $OutDir "$Domain.pfx"
$password = ConvertTo-SecureString -String "change-me" -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath $pfxPath -Password $password

# Export public cert (CER)
$cerPath = Join-Path $OutDir "$Domain.cer"
Export-Certificate -Cert $cert -FilePath $cerPath

# Convert PFX to PEM files (requires openssl in PATH)
$crtPath = Join-Path $OutDir "$Domain.crt"
$keyPath = Join-Path $OutDir "$Domain.key"
Write-Output "Converting PFX to PEM (requires openssl)..."
if (Get-Command openssl -ErrorAction SilentlyContinue) {
  & openssl pkcs12 -in $pfxPath -nodes -passin pass:change-me -out $OutDir\temp.pem
  & openssl pkey -in $OutDir\temp.pem -out $keyPath
  & openssl crl2pkcs7 -nocrl -certfile $cerPath | openssl pkcs7 -print_certs -out $crtPath
  Remove-Item $OutDir\temp.pem -Force
  Write-Output "Certs exported to $OutDir"
} else {
  Write-Warning "OpenSSL not found. You can use the generated .pfx or install OpenSSL to extract .crt/.key."
}