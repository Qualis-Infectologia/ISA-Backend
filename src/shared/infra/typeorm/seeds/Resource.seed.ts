import ICreateResourceDTO from "@security/resources/dtos/ICreateResourceDTO";

export default [{
  name: "Monitoramento",
  to: "/monitoramento",
  icon: "monitoring",
},
{
  name: "Diário",
  to: "/diario",
  icon: "diary",
},
{
  name: "Painel",
  to: "/painel",
  icon: "monitoring",
},
{
  name: "Cadastros",
  to: "/cadastros",
  icon: "register",
},
{
  name: "Logs",
  to: "/logs",
  icon: "logs",
},
{
  name: "Avaliações",
  to: '/avaliacoes',
  icon: "evaluations",
}] as ICreateResourceDTO[]
