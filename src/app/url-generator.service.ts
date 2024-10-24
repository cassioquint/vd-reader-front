import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlGeneratorService {

  private baseUrl: string = "http://intranet/wiki/index.php/Verifica%C3%A7%C3%A3o_di%C3%A1ria_dos_fontes_do_SIGER";

  generateWikiUrl(title: string): string {

    if (!title) {
      return this.baseUrl;
    }

    let subtitle = '';
    let newTitle = '';

    // Alguns tópicos na Wiki não possuem exatamente o mesmo título que é salvo no VD, esta função faz a substituição do link
    switch (title) {
      case 'Verifica resultado da última compilação geral (VeCmp.bat all)':
        newTitle = 'Verifica resultado da última compilação geral versão desenvolvimento MF (VeCmp.bat des mf) - igual para demais verificações, só muda a distribuição (MF ou isCOBOL) e a versão/release'
        break;
      case 'Verificação dos campos usados no validaRead (gbexxx_ajuste.cpy) e que são usadas no where (VeValidaRead.rb)':
        newTitle = 'Valida campos usados no validaRead e são usados no where da SPD (VeValidaRead.rb)';
        break;
      case 'Verifica arquivos do SVN (VeSvn.bat)':
        newTitle = 'Verifica arquivos do SVN e Working-Copys (VeSvn.bat)';
        break;
      case 'Verifica execução de importação do Autogrep (VeAutogrep.bat)':
        newTitle = 'Verifica logs e fila de importação do autogrep (VeAutogrep.bat)';
        break;
      case 'Resultado da Compilação dos fontes da Desenvolvimento (cpger.bat des noint)':
        newTitle = 'Resultado da Compilação dos fontes da Desenvolvimento (cpger.bat des new/cb noint)';
        break;
      case 'Verificação do log de warning de pre processamento (PreprocAll.bat)':
        newTitle = 'Verificação do log de warning de pré-processamento (PreprocAll.bat)';
        break;
      default:
        newTitle = title;
        break;
    }

    subtitle = encodeURIComponent(newTitle.replace(/ /g, '_'));
    return `${this.baseUrl}#${subtitle}`;
  }
}
