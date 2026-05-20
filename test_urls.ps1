$urls = @(
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Jaipur_03-2016_04_Amber_Fort.jpg/1280px-Jaipur_03-2016_04_Amber_Fort.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hawa_Mahal_2011.jpg/1280px-Hawa_Mahal_2011.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jaipur_03-2016_39_Jal_Mahal_-_Water_Palace.jpg/1280px-Jaipur_03-2016_39_Jal_Mahal_-_Water_Palace.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Monsoon_palace_udaipur.jpg/1280px-Monsoon_palace_udaipur.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Udaipur%2C_India%2C_Lake_Pichola.jpg/1280px-Udaipur%2C_India%2C_Lake_Pichola.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Kumbhalgarh_fort.jpg/1280px-Kumbhalgarh_fort.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/City_Palace-Jaipur-India0006.JPG/1280px-City_Palace-Jaipur-India0006.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Udaipur-citypalace.jpg/1280px-Udaipur-citypalace.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Fateh_Sagar_Lake%2C_Udaipur_02.jpg/1280px-Fateh_Sagar_Lake%2C_Udaipur_02.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Jagdish_Temple_-_Udaipur.jpg/1280px-Jagdish_Temple_-_Udaipur.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Govind_Dev_Ji_Temple%2C_Jaipur.jpg/1280px-Govind_Dev_Ji_Temple%2C_Jaipur.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Birla_Mandir_%2C_Jaipur.jpg/1280px-Birla_Mandir_%2C_Jaipur.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Bhangarh_fort_Alwar_Rajasthan.jpg/1280px-Bhangarh_fort_Alwar_Rajasthan.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Galtaji_temple_jaipur_rajasthan.jpg/1280px-Galtaji_temple_jaipur_rajasthan.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sambhar_lake_a_salted_bed.jpg/1280px-Sambhar_lake_a_salted_bed.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Inside_Chokhi_Dhani_Village_set_up_in_Jaipur.jpg/1280px-Inside_Chokhi_Dhani_Village_set_up_in_Jaipur.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Sisodia_Rani_Palace_and_Garden.jpg/1280px-Sisodia_Rani_Palace_and_Garden.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Shilpgram_Udaipur_1.jpg/1280px-Shilpgram_Udaipur_1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Eklingji_temple_udaipur.jpg/1280px-Eklingji_temple_udaipur.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jaisamand_Lake.jpg/1280px-Jaisamand_Lake.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Nahargarh_Fort%2C_Jaipur%2C_20191218_1529_9314.jpg/1280px-Nahargarh_Fort%2C_Jaipur%2C_20191218_1529_9314.jpg"
)

$pass = 0
$fail = 0
foreach ($url in $urls) {
  $name = $url.Split("/")[-1]
  try {
    $r = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -ErrorAction Stop
    Write-Host "OK  $($r.StatusCode) $name"
    $pass++
  } catch {
    Write-Host "FAIL $name - $($_.Exception.Message)"
    $fail++
  }
}
Write-Host "`nResults: $pass passed, $fail failed out of $($urls.Count) URLs"
