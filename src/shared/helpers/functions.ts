import { Noticia } from 'src/interfaces/stories';
import { NoticiaAbierta } from './../../interfaces/story';
export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp.replace(' ', 'T'));
  const difference: number = new Date().getTime() - date.getTime();

  if (difference < 0) {
    return `${date.getDate()}/${date.getMonth() + 1} | ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  let result: string | undefined;

  if (difference < 60000) {
    result = countSeconds(difference);
  } else if (difference < 3600000) {
    result = countMinutes(difference);
  } else if (difference < 86400000) {
    result = countHours(difference);
  } else if (difference < 604800000) {
    result = countDays(difference);
  } else if (difference / 1000 < 2419200) {
    result = countWeeks(difference);
  } else if (difference / 1000 < 31536000) {
    result = countMonths(difference);
  } else {
    result = countYears(difference);
  }

  return !result.startsWith('J') ? `hace ${result}` : result;
  // return result;
};

function countSeconds(difference: number) {
  const count: number = Math.trunc(difference / 1000);
  return count > 1 ? `${count} segundos` : 'Justo ahora';
}

function countMinutes(difference: number) {
  const count: number = Math.trunc(difference / 60000);
  return count.toString() + (count > 1 ? ' minutos' : ' minuto');
}

function countHours(difference: number) {
  const count: number = Math.trunc(difference / 3600000);
  return count.toString() + (count > 1 ? ' horas' : ' hora');
}

function countDays(difference: number) {
  const count: number = Math.trunc(difference / 86400000);
  return count.toString() + (count > 1 ? ' días' : ' día');
}

function countWeeks(difference: number) {
  const count: number = Math.trunc(difference / 604800000);
  if (count > 3) {
    return '1 month';
  }
  return count.toString() + (count > 1 ? ' semanas' : ' semana');
}

function countMonths(difference: number) {
  let count: number = Math.round(difference / 2628003000);
  count = count > 0 ? count : 1;
  if (count > 12) {
    return '1 year';
  }
  return count.toString() + (count > 1 ? ' meses' : ' mes');
}

function countYears(difference: number) {
  const count: number = Math.trunc(difference / 31536000000);
  return count.toString() + (count > 1 ? ' años' : ' año');
}

export function urlTitle(
  noticia: Noticia | NoticiaAbierta | undefined
): string {
  if (!noticia) {
    return '';
  }

  const title = noticia.title ?? 'Sin título';
  const id = noticia.id;

  return (
    '/' +
    title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(
        /(!|¡)|(\?|\¿)|(“|”)|(\(|\))|(\<|\>)|\"|\:|\…|\.|\‘|\’|\'|\%|\//g,
        ''
      )
      .replace(/[á,à,ä,â]/g, 'a')
      .replace(/[é,ë,è]/g, 'e')
      .replace(/[í,ï,ì]/g, 'i')
      .replace(/[ó,ö,ò]/g, 'o')
      .replace(/[ü,ú,ù]/g, 'u')
      .replace(/ñ/g, 'n') +
    `/${id}`
  );
}

export function cleanText(title: string): string {
  return title
    .replace(
      /(!|¡)|(\?|\¿)|(“|”)|(\(|\))|(\<|\>)|\"|\:|\…|\.|\‘|\’|\'|\%|\//g,
      ''
    )
    .replace(/[á,à,ä,â]/g, 'a')
    .replace(/[é,ë,è]/g, 'e')
    .replace(/[í,ï,ì]/g, 'i')
    .replace(/[ó,ö,ò]/g, 'o')
    .replace(/[ü,ú,ù]/g, 'u')
    .replace(/ñ/g, 'n');
}

export function imgUrl(image: string | undefined): string | undefined {
  if (!image) return undefined;
  const url = `${process.env.BASE_URL_IMAGES}/`;
  return `${url}${image}`;
}

export function canShare(): boolean {
  if (navigator.share != undefined) {
    return true;
  } else {
    return false;
  }
}

export async function shareUrl(noticia: NoticiaAbierta | Noticia) {
  const url = `${process.env.BASE_URL}${urlTitle(noticia)}`;
  const title = noticia.title;
  const text = noticia.subtitle;

  const data: ShareData = {
    text,
    title,
    url,
  };

  if (navigator.share) {
    await navigator.share(data);
  }
}

export const formatoNoticia: { [key: string]: string } = {
  '1': '(VIDEO)',
  '2': '(FOTO)',
  '3': '(ESTADÍSTICA)',
  '4': '(ENTREVISTA)',
  '5': '(EXCLUSIVA)',
};
