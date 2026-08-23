# SesVer - NSosyal Erişilebilirlik Prototipi

SesVer, sosyal medya içeriklerinin üretimden tüketime kadar daha erişilebilir olmasını hedefleyen yapay zekâ destekli bir NSosyal özellik prototipidir.

## Çalışan özellikler

- Tarayıcının `SpeechSynthesis` API'siyle Türkçe sesli okuma
- Orijinal metin ile örnek sadeleştirilmiş sürüm arasında geçiş
- Düzenlenebilir yapay zekâ görsel betimlemesi deneyimi
- Kullanıcıya özel erişilebilirlik profili
- İçerik oluşturma sırasında alt metin ve okunabilirlik kontrolü
- Klavye odağı, semantik HTML, canlı durum mesajları ve mobil görünüm

## Önemli prototip sınırı

Bu MVP'de sadeleştirme, görsel betimleme ve erişilebilirlik kontrolü önceden tanımlı örnek/kurallı çıktılarla gösterilir. Harici bir yapay zekâ modeli veya NSosyal API entegrasyonu yoktur. Üretim sürümünde STT, TTS ve görsel-dil modelleri servis katmanından bağlanacaktır. Otomatik çıktılar içerik üreticisi tarafından düzenlenebilir olmalı ve orijinal içerik korunmalıdır.

## Çalıştırma

Depoyu indirin ve `index.html` dosyasını modern bir tarayıcıda açın. Yerel sunucu için:

```powershell
python -m http.server 8080
```

Ardından `http://localhost:8080` adresine gidin.

## GitHub Pages

Repository Settings > Pages altında `Deploy from a branch`, `main` ve `/ (root)` seçilerek ek yapılandırma olmadan yayımlanabilir.

## Yol haritası

1. Türkçe STT/TTS servis entegrasyonu
2. Görsel betimleme modeli ve üretici onay akışı
3. Türkçe sadeleştirme modeli, anlam koruma ve geri dönüş kontrolü
4. Altyazı zaman kodları ve video oynatıcı entegrasyonu
5. WCAG 2.2 AA denetimi ve hedef kullanıcılarla kullanılabilirlik testi

## Lisans ve veri

Demo, eğitim verisi veya kişisel veri içermez. Model ve veri setleri eklendiğinde lisans, KVKK, veri minimizasyonu, hata/önyargı ve performans kayıtları ayrı dokümante edilmelidir.

