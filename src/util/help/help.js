import pino from 'pino'


class help {

    /**
     * 
     * @param {Object Data acess Perstence} data 
     * @param { Pagina atual } page 
     * @param { Limit de Posts por pagina} limit 
     * @returns {totalIteans,line,currentPage,totalPage}
     */
   static paginationData (data,page,limit){
      const {count: totalIteans ,rows: line } = data
      const currentPage = page ? +page : 1;
      const totalPage = Math.ceil(totalIteans/limit)
      return {totalIteans,line,currentPage,totalPage}
  }


  /**
   * 
   * @param {Pagina atual} page 
   * @param {alteracao dinamica} dinamic 
   * @returns {page,totalIteans}
   */
  static pagination (page,dinamic){
    const totalIteans = dinamic
    page = (page == 1) ? 0 : page -1;
    page = totalIteans * page;
    return {page,totalIteans}
  }
    /**
     -* 
     * @param { dias para o token expirare } expire 
     * @returns String Date / a data de expiracao ou data atual
     */
   static expireDate (expire = null){
        const data_atual = new Date()
        const expire_data = new Date(
            data_atual.getFullYear(),
            data_atual.getMonth(),
            data_atual.getDate() + parseInt(expire)
            ).toISOString()
        const string_transformation = new String(expire_data)

        if(expire){

            const today = new Date()

            const getData = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            ).toISOString()

            const transformation = new String(getData)

            return (transformation).match(/\d/g).join()
        }

        return (string_transformation).slice(0,10);
    }
}


const log = pino({
    enabled:!(!!process.env.LOG_DISABLED),
    transport:{
      target:'pino-pretty',
      options:{
        colorize: true
      }
    }
})

const Logger = log
export {help,Logger}