import JSZip from 'jszip';
import { ANDROID_FILES } from '../data/androidProjectFiles';

export async function downloadAndroidProjectZip() {
  const zip = new JSZip();

  // Agregar todos los archivos estructurados
  ANDROID_FILES.forEach(file => {
    zip.file(file.path, file.content);
  });

  // Agregar archivo de configuración Gradle Wrapper
  zip.file(
    'gradle/wrapper/gradle-wrapper.properties',
    `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.11.1-bin.zip
networkTimeout=10000
validateDistributionUrl=true
`
  );

  // Agregar recurso strings.xml
  zip.file(
    'app/src/main/res/values/strings.xml',
    `<resources>
    <string name="app_name">RegistroEventosCloud</string>
</resources>
`
  );

  // Agregar un placeholder instructivo para google-services.json
  zip.file(
    'app/google-services.json.instrucciones.txt',
    `¡IMPORTANTE!
Coloca aquí tu archivo 'google-services.json' generado desde la consola de Firebase.
Ruta destino: app/google-services.json

Verifica que el nombre del paquete en google-services.json coincida con:
"package_name": "com.registro.eventoscloud"
`
  );

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'RegistroEventosCloud-Android.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
