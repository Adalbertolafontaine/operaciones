USE [master]
GO
/****** Object:  Database [Operaciones]    Script Date: 20/5/2019 10:37:49 a.m. ******/
CREATE DATABASE [Operaciones]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Operaciones', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\Operaciones.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Operaciones_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\Operaciones_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Operaciones] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Operaciones].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Operaciones] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Operaciones] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Operaciones] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Operaciones] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Operaciones] SET ARITHABORT OFF 
GO
ALTER DATABASE [Operaciones] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Operaciones] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Operaciones] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Operaciones] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Operaciones] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Operaciones] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Operaciones] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Operaciones] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Operaciones] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Operaciones] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Operaciones] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Operaciones] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Operaciones] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Operaciones] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Operaciones] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Operaciones] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Operaciones] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Operaciones] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Operaciones] SET  MULTI_USER 
GO
ALTER DATABASE [Operaciones] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Operaciones] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Operaciones] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Operaciones] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Operaciones] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Operaciones] SET QUERY_STORE = OFF
GO
USE [Operaciones]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [Operaciones]
GO
/****** Object:  User [mapeo]    Script Date: 20/5/2019 10:37:50 a.m. ******/
CREATE USER [mapeo] FOR LOGIN [mapeo] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [mapeo]
GO
/****** Object:  Table [dbo].[Provincias]    Script Date: 20/5/2019 10:37:50 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Provincias](
	[id] [smallint] IDENTITY(1,1) NOT NULL,
	[enlace] [varchar](2) NOT NULL,
	[desc_provincia] [nchar](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Municipios]    Script Date: 20/5/2019 10:37:51 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Municipios](
	[id] [smallint] IDENTITY(1,1) NOT NULL,
	[enlace] [varchar](6) NOT NULL,
	[desc_municipio] [nchar](60) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Actividades]    Script Date: 20/5/2019 10:37:51 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Actividades](
	[id] [smallint] IDENTITY(1,1) NOT NULL,
	[desc_actividad] [nchar](60) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inspectoria]    Script Date: 20/5/2019 10:37:51 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inspectoria](
	[id] [smallint] IDENTITY(1,1) NOT NULL,
	[division] [smallint] NOT NULL,
	[desc_inspectoria] [nchar](60) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Divisiones]    Script Date: 20/5/2019 10:37:52 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Divisiones](
	[id] [smallint] IDENTITY(1,1) NOT NULL,
	[desc_division] [nchar](60) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Secciones]    Script Date: 20/5/2019 10:37:52 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Secciones](
	[id] [smallint] IDENTITY(1,1) NOT NULL,
	[Inspectoria] [int] NOT NULL,
	[desc_seccion] [nchar](60) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Operativos]    Script Date: 20/5/2019 10:37:52 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Operativos](
	[id] [smallint] IDENTITY(1,1) NOT NULL,
	[orden] [nchar](20) NULL,
	[division] [int] NULL,
	[inspectoria] [int] NULL,
	[seccion] [int] NULL,
	[provincia] [varchar](2) NULL,
	[municipio] [varchar](6) NULL,
	[barrio] [nvarchar](max) NULL,
	[actividad] [int] NULL,
	[salidad] [datetime] NULL,
	[llegada] [datetime] NULL,
	[informacionll] [varchar](50) NULL,
	[informacionsalida] [varchar](50) NULL,
	[novedades] [nvarchar](max) NULL,
	[longitud] [numeric](12, 6) NULL,
	[latitud] [numeric](12, 6) NULL,
	[hombres] [int] NULL,
	[mujeres] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[VWoperativos]    Script Date: 20/5/2019 10:37:52 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VWoperativos]
AS
SELECT        O.id, O.orden, O.salidad, O.llegada, dbo.Divisiones.desc_division, dbo.Provincias.desc_provincia, dbo.Municipios.desc_municipio, dbo.Actividades.desc_actividad, dbo.Inspectoria.desc_inspectoria, 
                         dbo.Secciones.desc_seccion, O.longitud, O.latitud, O.barrio, O.informacionll, O.informacionsalida, O.novedades, O.division, O.inspectoria, O.seccion, O.provincia, O.municipio, O.actividad
FROM            dbo.Operativos AS O LEFT OUTER JOIN
                         dbo.Municipios ON O.municipio = dbo.Municipios.enlace LEFT OUTER JOIN
                         dbo.Actividades ON O.actividad = dbo.Actividades.id LEFT OUTER JOIN
                         dbo.Inspectoria ON O.inspectoria = dbo.Inspectoria.id LEFT OUTER JOIN
                         dbo.Secciones ON O.seccion = dbo.Secciones.id LEFT OUTER JOIN
                         dbo.Provincias ON O.provincia = dbo.Provincias.enlace LEFT OUTER JOIN
                         dbo.Divisiones ON O.division = dbo.Divisiones.id
GO
/****** Object:  Table [dbo].[Barrios]    Script Date: 20/5/2019 10:37:52 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Barrios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[enlace] [varchar](12) NOT NULL,
	[desc_barrio] [nchar](200) NOT NULL,
	[longitud] [decimal](12, 6) NULL,
	[latitud] [decimal](12, 6) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Decomisos]    Script Date: 20/5/2019 10:37:52 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Decomisos](
	[id] [smallint] IDENTITY(1,1) NOT NULL,
	[operativo] [int] NOT NULL,
	[categoria] [nchar](10) NOT NULL,
	[nombre] [nchar](30) NOT NULL,
	[cantidad] [decimal](18, 2) NOT NULL,
	[unidad] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empleados]    Script Date: 20/5/2019 10:37:52 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleados](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](110) NOT NULL,
	[estatus] [char](50) NULL,
	[sueldo] [int] NOT NULL,
	[institucion] [varchar](60) NOT NULL,
	[sexo] [nchar](1) NULL,
	[coincidencia] [int] NULL,
	[ingreso] [date] NULL
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[5] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1[50] 4[25] 3) )"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1[50] 2[25] 3) )"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4[30] 2[40] 3) )"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1[56] 3) )"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2[66] 3) )"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4[50] 3) )"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[63] 4[13] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1[65] 4) )"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4[60] 2) )"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4) )"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 9
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "O"
            Begin Extent = 
               Top = 32
               Left = 30
               Bottom = 383
               Right = 196
            End
            DisplayFlags = 280
            TopColumn = 1
         End
         Begin Table = "Municipios"
            Begin Extent = 
               Top = 237
               Left = 358
               Bottom = 350
               Right = 528
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Actividades"
            Begin Extent = 
               Top = 160
               Left = 494
               Bottom = 256
               Right = 664
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Inspectoria"
            Begin Extent = 
               Top = 17
               Left = 570
               Bottom = 130
               Right = 740
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Secciones"
            Begin Extent = 
               Top = 62
               Left = 686
               Bottom = 175
               Right = 856
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Provincias"
            Begin Extent = 
               Top = 110
               Left = 274
               Bottom = 223
               Right = 444
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Divisiones"
            Begin Extent = 
               Top = 6
               Left = 246
               Bottom = 102
               Right = 416
            End
            DisplayF' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VWoperativos'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'lags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
      PaneHidden = 
   End
   Begin DataPane = 
      PaneHidden = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 12
         Width = 284
         Width = 2775
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 3900
         Alias = 2820
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VWoperativos'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VWoperativos'
GO
USE [master]
GO
ALTER DATABASE [Operaciones] SET  READ_WRITE 
GO
